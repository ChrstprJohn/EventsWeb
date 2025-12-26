'use server';

import Event from '@/database/event.model';
import connectDB from '../mongodb';

export const getSimilarEventBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug }).select('tags').lean();

        if (!event) return [];

        return await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        })
            .select('title slug image date tags')
            .limit(4)
            .lean();
    } catch (error) {
        console.error('getSimilarEventBySlug error:', error);
        return [];
    }
};

// implement soon

// export async function getEventBySlug(slug: string) {
//     await connectDB();

//     const event = await Event.findOne({ slug }).lean();

//     return event;
// }
