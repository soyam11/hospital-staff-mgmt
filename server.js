
const app = require('./app');
const db = require("./models");
const bcrypt = require('bcryptjs');

const seedRolesAndPermissions = async () => {
  const Role = db.Role;
  const Permission = db.Permission;

  const adminPermissions = await Permission.create({
    create: true,
    read: true,
    update: true,
    delete: true
  });

  const doctorPermissions = await Permission.create({
    create: false,
    read: true,
    update: false,
    delete: false
  });

  const nursePermissions = await Permission.create({
    create: false,
    read: false,
    update: false,
    delete: false
  });

  await Role.create({ roleName: 'admin', permissionId: adminPermissions.id });
  await Role.create({ roleName: 'doctor', permissionId: doctorPermissions.id });
  await Role.create({ roleName: 'nurse', permissionId: nursePermissions.id });

};



const createAdminStaff = async () => {
  try {
    const Staff = db.Staff;
    const Role = db.Role;

    const adminExists = await Staff.findOne({ where: { username: 'admin' } });

    if (!adminExists) {
      const adminRole = await Role.findOne({ where: { roleName: 'admin' } });
      await Staff.create({
        name: 'Admin User',
        department: 'Administration',
        jobTitle: 'Administrator',
        contactInfo: 'admin@example.com',
        username: 'admin',
        password: bcrypt.hashSync('admin', 8),
        roleId: adminRole.id
      });
    }
  } catch (error) {
    console.error('Error creating admin staff:', error);
  }
};


db.sequelize.sync({ force: true }).then(() => {
  seedRolesAndPermissions().then(() => {
    console.log("Roles and permissions have been seeded");   
    createAdminStaff().catch(error => console.error('Error during admin user creation:', error));
  }).catch(error => console.error('Error during seeding roles and permissions:', error));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
