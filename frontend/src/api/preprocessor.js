import api from "./api";
import { userDetails } from "./stores";

const preprocessor = {
  profile: {
    details: async (userID) => {
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

      const followersPromises = response.data.map((e) =>
        preprocessor.profile.details(e.follow.follower_id)
      );

      const followers = await Promise.all(followersPromises);

      return followers;
    },

    following: async (userID) => {
      const response = await api.get(`/users/followers/${userID}`)

      const followingPromises = response.data.map((e) =>
        preprocessor.profile.details(e.follow.following_id)
      );

      const following = await Promise.all(followingPromises);

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

  },

  post: {
    details: async (id) => {
      const response = await api.get(`/post/${id}`)
      return response.data
    }
  }
};

export default preprocessor;