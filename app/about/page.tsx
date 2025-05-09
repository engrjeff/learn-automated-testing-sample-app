import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

function AboutPage() {
  return (
    <div>
      <h1 className="font-bold text-lg mb-4">About Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        corrupti iure incidunt cumque error saepe odio, necessitatibus unde,
        earum esse vel eos, eaque neque ipsa ipsum dicta tempora voluptas harum?
        Aperiam, necessitatibus ab quae, blanditiis labore est neque, officiis
        reprehenderit ipsum itaque eos temporibus vero quaerat ducimus? Ipsa
        veniam eveniet, quos, vel tempora tenetur autem, temporibus doloribus
        ipsam quasi voluptates. Quasi animi debitis deleniti asperiores magni
        voluptatum vero neque a doloribus distinctio libero eius fugiat nulla,
        reiciendis voluptatibus eaque, quas atque eos, autem molestiae
        perferendis.
      </p>
    </div>
  );
}

export default AboutPage;
