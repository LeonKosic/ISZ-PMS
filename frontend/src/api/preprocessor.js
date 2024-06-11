import api from "./api";
import { userDetails } from "./stores";

const preprocessor = {
  profile: {
    userDetails: async (userID) => {
      const response = await api.get(`/users/${userID}`)

      const parsed = {
        id: response.data.id,
        username: response.data.username,
        name: response.data.name,
        email: response.data.email
      }

      return parsed
    },

    followers: async (userID) => {
      const response = await api.get(`/users/followers/${userID}`)

      let followers = []
      response.data.forEach(async (e) => {
        const followerInfo = await userDetails(e.follow.follower_id)
        followers.push(followerInfo)
      });

      return followers;
    },

    following: async (userID) => {
      const response = await api.get(`/users/followers/${userID}`)

      let following = []
      response.data.forEach(async (e) => {
        const followingInfo = await userDetails(e.follow.following_id)
        following.push(followingInfo)
      });

      return following;
    },

    projects: async (userID) => {
      let response;

      if (userID == userDetails.id)
        response = await api.get('/projects/my')
      else
        response = await api.get(`/users/projects/${userID}`)

      return response.data;
    }
  },

  course: {

  },

  project: {

  }
};

export default preprocessor;