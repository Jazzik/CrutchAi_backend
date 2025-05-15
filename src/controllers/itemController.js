const supabaseService = require("../services/supabaseService");

class ItemController {
  async getItems(req, res) {
    try {
      const items = await supabaseService.getItems();

      if (items && items.length > 0) {
        res.json({
          message: "Successfully fetched data from Supabase!",
          data: items,
        });
      } else {
        res.json({
          message:
            'Connected to Supabase, but no data found in "items" table or table is empty.',
        });
      }
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
}

module.exports = new ItemController();
