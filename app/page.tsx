import EventCard from "@/Components/EventCard";
import ExploreBtn from "@/Components/ExploreBtn";
import { events } from "@/lib/constants";
import React from "react";

const Page = () => {
   // throw new Error("Not Implemented");

   return (
      <section>
         <h1 className="text-center">
            The hub for Every dev <br /> Event you cant miss
         </h1>
         <p className="text-center mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         </p>

         <ExploreBtn />

         <div className="mt-20 space-y-7">
            <h3>Featured Events</h3>

            <ul className="events">
               {events.map((event) => (
                  <li key={event.title}>
                     <EventCard {...event} />
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};

export default Page;
