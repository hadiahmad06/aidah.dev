

export default function Resume() {
  return (
    <section className="bg-background-dark text-foreground py-24 flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-accent-lilac">Resume</h2>
      <div className="w-full max-w-4xl h-64 border-2 border-accent-lilac/50 rounded-lg flex items-center justify-center bg-background/60">
        {/* Placeholder for downloadable resume */}
        <p className="text-gray-400">Resume download button or content will go here</p>
      </div>
    </section>
  );
}