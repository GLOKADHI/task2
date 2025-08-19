export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0">
        {/* Large floating circles with glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-60" style={{ animation: 'glow 4s ease-in-out infinite' }}></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-3xl opacity-40" style={{ animation: 'glow 6s ease-in-out infinite', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" style={{ animation: 'glow 5s ease-in-out infinite', animationDelay: '4s' }}></div>
        
        {/* Moving particles with drift animation */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 dark:bg-primary/20 rounded-full opacity-40"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animation: `drift ${6 + i}s linear infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Floating geometric shapes with wave motion */}
        <div className="floating-shapes">
          <div className="absolute top-20 left-10 w-4 h-4 border-2 border-secondary/30 dark:border-secondary/20 rotate-45" style={{ animation: 'wave 8s ease-in-out infinite', animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-20 w-6 h-6 border-2 border-accent/40 dark:border-accent/25" style={{ animation: 'wave 10s ease-in-out infinite', animationDelay: '3s' }}></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/30 dark:bg-primary/20 rounded-full" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '5s' }}></div>
          <div className="absolute bottom-20 right-40 w-5 h-5 border-2 border-primary/25 dark:border-primary/15 rotate-12" style={{ animation: 'wave 7s ease-in-out infinite', animationDelay: '2s' }}></div>
          <div className="absolute top-60 left-1/2 w-4 h-4 bg-secondary/20 dark:bg-secondary/15" style={{ animation: 'drift 9s linear infinite', animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-60 right-1/4 w-3 h-3 border-2 border-accent/30 dark:border-accent/20 rounded-full" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '4s' }}></div>
        </div>

        {/* Additional glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full" style={{ animation: 'glow 7s ease-in-out infinite', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-radial from-secondary/10 to-transparent rounded-full" style={{ animation: 'glow 8s ease-in-out infinite', animationDelay: '3s' }}></div>

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30 dark:from-background/70 dark:to-background/40"></div>
      </div>
    </div>
  );
}