
import { motion } from "framer-motion";
import { Brain, Target, Heart } from "lucide-react";

const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-up">
          <span className="px-4 py-2 bg-accent inline-block rounded-full text-sm font-medium text-secondary-foreground">
            Welcome to Your Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
            Transform Your Life Through
            <br /> Personal Development
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Discover the tools, insights, and guidance you need to unlock your full potential and create lasting positive change.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 pt-8">
          {[
            {
              icon: Brain,
              title: "Mindful Growth",
              description: "Develop deeper self-awareness and emotional intelligence through guided practices.",
            },
            {
              icon: Target,
              title: "Goal Achievement",
              description: "Set meaningful goals and create actionable plans to reach your highest potential.",
            },
            {
              icon: Heart,
              title: "Personal Wellness",
              description: "Balance your physical, mental, and emotional well-being for optimal living.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Quote Section */}
        <section className="text-center max-w-4xl mx-auto">
          <blockquote className="text-2xl font-medium text-primary italic">
            "The only person you are destined to become is the person you decide to be."
          </blockquote>
          <p className="mt-4 text-secondary">Ralph Waldo Emerson</p>
        </section>
      </div>
    </div>
  );
};

export default Index;
