import EventCard from '@/Components/EventCard';
import ExploreBtn from '@/Components/ExploreBtn';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
// import { events } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
    // throw new Error("Not Implemented");
    'use cache';
    //  cacheLife('hours'); // delay created data for hours

    const response = await fetch(`${BASE_URL}/api/events`);
    const { events } = await response.json();

    return (
        <section>
            <h1 className='text-center'>
                The Hub for Every Dev <br /> Event you Can't miss
            </h1>
            <p className='text-center mt-5'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>

            <ExploreBtn />

            <div className='mt-20 space-y-7'>
                <h3>Featured Events</h3>

                <ul className='events list-none m-0 p-0'>
                    {events &&
                        events.length > 0 &&
                        events.map((event: IEvent) => (
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
