const { getSession, createSession } = require("./keygen")
      const { ipcRenderer } = require("electron")

      // Check if there's an existing session
      const session = getSession()
      if (session != null) {
        ipcRenderer.send("authenticated")
      }

      // Authenticate user and create a new session
      const login = document.getElementById("login")

      login.addEventListener("submit", async (event) => {
        event.preventDefault()

        const email = document.getElementById("email")
        const password = document.getElementById("password")
        const { token, errors } = await createSession(email.value, password.value)
        if (errors) {
          const [{ title, detail }] = errors

          alert(`${title}: ${detail}`)

          return false
        }

        ipcRenderer.send("authenticated")
      })