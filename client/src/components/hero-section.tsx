import { Button } from '@/components/ui/button';

function HeroSection() {
  return (
    <section 
      id="inicio" 
      className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
    >
      <div className="absolute inset-0 overlay-gradient"></div>
      <div className="container mx-auto px-4 z-10 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-3 text-shadow">
          Transforma Tu Vida con Audio Motívate
        </h1>
        <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-shadow">
          Audiolibros y contenido motivacional para elevar tu mente y alcanzar tu máximo potencial.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-lg py-5"
            asChild
          >
            <a href="#audiolibros">Explorar Audiolibros</a>
          </Button>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-lg py-5 px-4 whitespace-normal"
            asChild
          >
            <a href="#videos" className="text-center">Contenido Motivacional</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
