export default function Stats() {
  const stats = [
    {
      label: "Happy Customers",
      value: "10K+",
      icon: "😊",
    },
    {
      label: "Products Customized",
      value: "50K+",
      icon: "🎨",
    },
    {
      label: "Quality Guarantee",
      value: "100%",
      icon: "✓",
    },
    {
      label: "Fast Delivery",
      value: "3-5 Days",
      icon: "🚚",
    },
  ]

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-primary-foreground/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
