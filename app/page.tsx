import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-500 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">VaultCore Test</h1>
        <p className="text-xl mb-4">This is a test to see if Tailwind CSS is working.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Card 1</h2>
            <p>This should have a white background and black text.</p>
          </div>
          
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Card 2</h2>
            <p>This should have a green background and white text.</p>
          </div>
          
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Card 3</h2>
            <p>This should have a red background and white text.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}
