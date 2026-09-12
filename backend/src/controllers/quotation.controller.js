const prisma = require("../utils/prisma");

const createQuotation = async (req, res) => {
  try {
    const rfqId = Number(req.params.id);
    const { price, deliveryTime, notes } = req.body;

    if (!price || !deliveryTime) {
      return res.status(400).json({
        message: "Price and delivery time are required",
      });
    }

    const rfq = await prisma.rFQ.findUnique({
      where: {
        id: rfqId,
      },
    });

    if (!rfq) {
      return res.status(404).json({
        message: "RFQ not found",
      });
    }

    if (rfq.status !== "OPEN") {
      return res.status(400).json({
        message: "This RFQ is closed",
      });
    }

    const existingQuotation = await prisma.quotation.findUnique({
      where: {
        rfqId_supplierId: {
          rfqId,
          supplierId: req.user.id,
        },
      },
    });

    if (existingQuotation) {
      return res.status(409).json({
        message: "You have already submitted a quotation for this RFQ",
      });
    }

    const quotation = await prisma.quotation.create({
      data: {
        price: Number(price),
        deliveryTime,
        notes: notes || null,
        rfqId,
        supplierId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Quotation submitted successfully",
      quotation,
    });
  } catch (error) {
    console.error("Create quotation error:", error);

    res.status(500).json({
      message: "Failed to submit quotation",
    });
  }
};
const getRFQQuotations = async (req, res) => {
  try {
    const rfqId = Number(req.params.id);

    const rfq = await prisma.rFQ.findUnique({
      where: {
        id: rfqId,
      },
    });

    if (!rfq) {
      return res.status(404).json({
        message: "RFQ not found",
      });
    }

    if (rfq.buyerId !== req.user.id) {
      return res.status(403).json({
        message: "You can only view quotations for your own RFQs",
      });
    }

    const quotations = await prisma.quotation.findMany({
      where: {
        rfqId,
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(quotations);
  } catch (error) {
    console.error("Get RFQ quotations error:", error);

    res.status(500).json({
      message: "Failed to fetch quotations",
    });
  }
};
const getMyQuotations = async (req, res) => {
  try {
    const quotations = await prisma.quotation.findMany({
      where: {
        supplierId: req.user.id,
      },
      include: {
        rfq: {
          select: {
            id: true,
            title: true,
            quantity: true,
            location: true,
            deadline: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(quotations);
  } catch (error) {
    console.error("Get my quotations error:", error);

    res.status(500).json({
      message: "Failed to fetch quotations",
    });
  }
};

module.exports = {
  createQuotation,
  getRFQQuotations,
  getMyQuotations,
};