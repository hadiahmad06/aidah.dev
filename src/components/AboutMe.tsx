export default function AboutMe() {
  return (
    <section className="bg-gray-900 text-white py-24 px-8 flex flex-col gap-16 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>

      {/* Subsection 1 */}
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl flex flex-col gap-4 shadow-lg">
        <h3 className="text-2xl font-semibold">[Title 1]</h3>
        <p className="text-gray-300">[Content placeholder]</p>
      </div>

      {/* Subsection 2 */}
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl flex flex-col gap-4 shadow-lg">
        <h3 className="text-2xl font-semibold">[Title 2]</h3>
        <p className="text-gray-300">[Content placeholder]</p>
      </div>

      {/* Subsection 3 */}
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl flex flex-col gap-4 shadow-lg">
        <h3 className="text-2xl font-semibold">[Title 3]</h3>
        <p className="text-gray-300">[Content placeholder]</p>
      </div>
    </section>
  );
}
