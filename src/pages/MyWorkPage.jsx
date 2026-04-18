import React from 'react';
import { projects } from '../utils/my-work';

export default function MyWorkPage() {

  return (
    <div className="max-w-[1170px] mx-auto px-4 md:px-0 md:pt-15 pb-24">
      <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-center mt-12 mb-16 font-last-shuriken text-[#323131]">
        MY WORK
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div
              className={`rounded-lg overflow-hidden w-full h-[360px] ${project.bgClass}`}
            >
              <img
                src={project.img}
                className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${project.imgClass || ''
                  }`}
                alt={project.title}
              />
            </div>
            <h3 className="mt-4 font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.type}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
