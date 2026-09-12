const prisma = require("../utils/prisma");

const createRFQ = async (req, res) => {
  try {
    const { title, description, quantity, location, deadline } = req.body;

    if (!title || !description || !quantity || !location || !deadline) {
      return res.status(400).json({
        message: "All RFQ fields are required",
      });
    }

    const rfq = await prisma.rFQ.create({
      data: {
        title,
        description,
        quantity: Number(quantity),
        location,
        deadline: new Date(deadline),
        buyerId: req.user.id,
      },
    });

    res.status(201).json({
      message: "RFQ created successfully",
      rfq,
    });
  } catch (error) {
    console.error("Create RFQ error:", error);

    res.status(500).json({
      message: "Failed to create RFQ",
    });
  }
};

const getMyRFQs = async (req, res) => {
  try {
    const rfqs = await prisma.rFQ.findMany({
      where: {
        buyerId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(rfqs);
  } catch (error) {
    console.error("Get my RFQs error:", error);

    res.status(500).json({
      message: "Failed to fetch RFQs",
    });
  }
};

const getRFQs = async (req, res) => {
  try {
    const rfqs = await prisma.rFQ.findMany({
      where: {
        status: "OPEN",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(rfqs);
  } catch (error) {
    console.error("Get RFQs error:", error);

    res.status(500).json({
      message: "Failed to fetch RFQs",
    });
  }
};
const getRFQById = async (req, res) => {
  try {
    const rfq = await prisma.rFQ.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!rfq) {
      return res.status(404).json({
        message: "RFQ not found",
      });
    }

    res.json(rfq);
  } catch (error) {
    console.error("Get RFQ error:", error);

    res.status(500).json({
      message: "Failed to fetch RFQ",
    });
  }
};
const updateRFQ = async (req, res) => {
  try {
    const rfqId = Number(req.params.id);

    const existingRFQ = await prisma.rFQ.findUnique({
      where: {
        id: rfqId,
      },
    });

    if (!existingRFQ) {
      return res.status(404).json({
        message: "RFQ not found",
      });
    }

    if (existingRFQ.buyerId !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own RFQs",
      });
    }

    const {
      title,
      description,
      quantity,
      location,
      deadline,
      status,
    } = req.body;

    const data = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      data.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          message: "Description is required",
        });
      }

      data.description = description.trim();
    }

    if (quantity !== undefined) {
      const parsedQuantity = Number(quantity);

      if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
        return res.status(400).json({
          message: "Quantity must be at least 1",
        });
      }

      data.quantity = parsedQuantity;
    }

    if (location !== undefined) {
      if (!location.trim()) {
        return res.status(400).json({
          message: "Location is required",
        });
      }

      data.location = location.trim();
    }

    if (deadline !== undefined) {
      const parsedDeadline = new Date(deadline);

      if (Number.isNaN(parsedDeadline.getTime())) {
        return res.status(400).json({
          message: "Please provide a valid deadline",
        });
      }

      data.deadline = parsedDeadline;
    }

    if (status !== undefined) {
      if (!["OPEN", "CLOSED"].includes(status)) {
        return res.status(400).json({
          message: "Status must be OPEN or CLOSED",
        });
      }

      data.status = status;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No fields provided for update",
      });
    }

    const rfq = await prisma.rFQ.update({
      where: {
        id: rfqId,
      },
      data,
    });

    res.json({
      message: "RFQ updated successfully",
      rfq,
    });
  } catch (error) {
    console.error("Update RFQ error:", error);

    res.status(500).json({
      message: "Failed to update RFQ",
    });
  }
};

module.exports = {
  createRFQ,
  getMyRFQs,
  getRFQs,
  getRFQById,
  updateRFQ,
};