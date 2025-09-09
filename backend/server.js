import app from "./src/app.js";
import { sequelize } from "./src/models/index.js";
import { seedMemberships } from "./src/utils/seedData.js";

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB Connection Error: ", err));

sequelize.sync({ force: false })
  .then(() => {
    console.log("All models synced");
    return seedMemberships();
  })
  .then(() => console.log("Database seeded"))
  .catch(err => console.error("Sync Error: ", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
