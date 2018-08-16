const request = require('request-promise');
const urls = JSON.parse(process.env.urls);

exports.handler = async message => {
  for (const url of urls) {
    console.log(`URL: ${url}`);
    let user = {
      id: `user${Math.floor(Math.random() * 10000)}`,
      firstName: 'Jane',
      lastName: 'Doe',
      color: 'teal'
    };

    let options = {
      url: url,
      body: user,
      json: true
    };

    // List users
    console.log(`Listing users`);
    options.method = 'get';
    await request(options);

    // Create User
    console.log(`Adding user ${user.id}`);
    options.method = 'post';
    await request(options);

    // Update user
    console.log(`Updating user ${user.id}`);
    options.method = 'put';
    options.url = `${url}/${user.id}`;
    user.color = 'coral';
    await request(options);

    // Get user
    console.log(`Getting user ${user.id}`);
    await request.get(`${url}/${user.id}`);

    // Delete user
    console.log(`Deleting user ${user.id}`);
    options.method = 'delete';
    await request(options);

    /*
    // Create user with bad data - intentional failure
    console.log(`Adding user with bad data to cause function to fail`);
    delete user.color;
    options.method = 'post';
    options.url = url;
    try {
      await request(options);
    } catch (err) {
      // Expecting an error, continute
    }
    */
  }

  return {};
};
