import './index.css'; // Ensure this path is correct and points to your TailwindCSS file
import { Navbar, Welcome, Footer, Services, Transactions } from "./components"


const App = () => {   //modern code, arrow function

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>

  )
}

export default App
