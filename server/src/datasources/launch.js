// Apollo provides a DataSource class that we can extend to handle interaction logic for a particular type of data source. In this section, we'll extend DataSource to connect both a REST API and a SQL database to Apollo Server. Don't worry, you don't need to be familiar with either of these technologies to follow along with the example

//connect the SpaceX v2 REST API to our server. 

// use the RESTDataSource class from the apollo-datasource-rest package. This class is an extension of DataSource that handles fetching data from a REST API. To use this class, you extend it and provide it the base URL of the REST API it will communicate with.

const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  
    constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }



async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  //Using a reducer like this enables the getAllLaunches method to remain concise as our definition of a Launch potentially changes and grows over time. It also helps with testing the LaunchAPI class
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }
  
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }
}

module.exports = LaunchAPI;