
import { motion } from "framer-motion";
import { Users, Star, Clock } from "lucide-react";

const statistics = [
  {
    icon: Users,
    value: "10,000+",
    label: "Estudiantes Impactados",
    delay: 0.1
  },
  {
    icon: Star,
    value: "300+",
    label: "Eventos Realizados",
    delay: 0.2
  },
  {
    icon: Clock,
    value: "15+",
    label: "Años de Experiencia",
    delay: 0.3
  }
];

const StatisticsSection = () => {
  return (
    <section className="py-24">
      <div className="grid md:grid-cols-3 gap-12">
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: stat.delay }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <stat.icon className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
