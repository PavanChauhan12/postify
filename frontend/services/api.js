const BASE_URL = "http://localhost:3000" // Your backend server URL

const api = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Signup failed")
      }
      return data
    } catch (error) {
      console.error("Signup API error:", error)
      throw error
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // ✅ Expecting token in the response body
      const accessToken = data.token || data.accessToken
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
      } else {
        throw new Error("Access token not found in response")
      }

      return data
    } catch (error) {
      console.error("Login API error:", error)
      throw error
    }
  },

  getProfile: async () => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in.")
    }
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile")
      }
      return data
    } catch (error) {
      console.error("Get Profile API error:", error)
      throw error
    }
  },

  editProfile: async (profileData) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in.")
    }
    try {
      const response = await fetch(`${BASE_URL}/auth/editProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile")
      }
      return data
    } catch (error) {
      console.error("Edit Profile API error:", error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken")
  },
}

export default api
