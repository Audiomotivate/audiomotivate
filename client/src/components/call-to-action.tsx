import { Button } from '@/components/ui/button';

function CallToAction() {
  return (
    <section 
      className="relative py-10 sm:py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
    >
      <div className="absolute inset-0 bg-dark/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-3">
            "La inversión en conocimiento paga el mejor interés"
          </h2>
          <p className="text-lg">— Benjamin Franklin</p>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
