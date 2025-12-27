'use server';

import Event from '@/database/event.model';
import connectDB from '../mongodb';

/**
 * Fetch all events from the database
 * Returns events in descending order by creation date
 */
export const getEvents = async () => {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 }).lean();

        return { events: JSON.parse(JSON.stringify(events)) };
    } catch (error) {
        console.error('getEvents error:', error);
        return { events: [] };
    }
};

/**
 * Fetch a single event by its slug
 */
export const getEventBySlug = async (slug: string) => {
    try {
        await connectDB();

        // Sanitize slug
        const sanitizedSlug = slug.trim().toLowerCase();

        const event = await Event.findOne({ slug: sanitizedSlug }).lean();

        if (!event) return null;

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.error('getEventBySlug error:', error);
        return null;
    }
};

/**
 * Fetch similar events based on tags
 */
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
