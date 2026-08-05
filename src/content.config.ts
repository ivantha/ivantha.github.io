import { defineCollection, z } from "astro:content"
import { loadYamlList, loadYamlSingle, loadYamlStringList } from "@/lib/loaders"

const includeIn = z.array(z.enum(["academic", "casual", "web"]))

const personal = defineCollection({
    loader: () => loadYamlSingle("personal.yaml"),
    schema: z.object({
        first_name: z.string(),
        last_name: z.string(),
        roles_casual: z.array(z.string()).optional(),
        tagline_casual: z.string().optional(),
        tagline_academic_role: z.string().optional(),
        tagline_academic_field: z.string().optional(),
        emails: z
            .array(
                z.object({
                    address: z.string(),
                    academic_only: z.boolean().optional(),
                }),
            )
            .optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        homepage: z.object({ url: z.string(), label: z.string() }).optional(),
        profile_entries: z
            .record(
                z.string(),
                z.object({
                    url: z.string(),
                    label: z.string(),
                    label_academic: z.string().optional(),
                    label_web: z.string().optional(),
                }),
            )
            .optional(),
        profiles_academic: z.array(z.string()).optional(),
        profiles_casual: z.array(z.string()).optional(),
        profiles_web: z.array(z.string()).optional(),
        bio_web: z.array(z.string()).optional(),
        about_me: z.string().optional(),
        interests_casual: z.string().optional(),
        interests_academic: z.string().optional(),
        who_am_i: z.array(z.string()).optional(),
    }),
})

const publications = defineCollection({
    loader: () => loadYamlSingle("publications.yaml"),
    schema: z.object({
        equal_contribution_note: z.string().optional(),
        items: z.array(
            z.object({
                venue_type: z.string(),
                include_in: includeIn.optional(),
                year: z.number(),
                authors: z.array(
                    z.object({
                        name: z.string(),
                        self: z.boolean().optional(),
                        equal_contribution: z.boolean().optional(),
                    }),
                ),
                title: z.string(),
                title_casual: z.string().optional(),
                venue: z.string().optional(),
                venue_casual: z.string().optional(),
                doi_url: z.string().optional(),
                doi_label: z.string().optional(),
                pdf_url: z.string().optional(),
            }),
        ),
    }),
})

const experience = defineCollection({
    loader: () => loadYamlList("experience.yaml"),
    schema: z.object({
        include_in: includeIn.optional(),
        category: z.enum(["professional", "research"]),
        role: z.string().optional(),
        role_academic: z.string().optional(),
        role_casual: z.string().optional(),
        company: z.string().optional(),
        company_academic: z.string().optional(),
        company_casual: z.string().optional(),
        location: z.string().optional(),
        location_academic: z.string().optional(),
        location_casual: z.string().optional(),
        dates: z.string(),
        advisor: z.string().optional(),
        bullets: z.array(
            z.object({
                text: z.string(),
                text_casual: z.string().optional(),
                stack: z.string().optional(),
                stack_casual: z.string().optional(),
                include_in: includeIn.optional(),
            }),
        ),
    }),
})

const education = defineCollection({
    loader: () => loadYamlList("education.yaml"),
    schema: z.object({
        include_in: includeIn.optional(),
        institute: z.string(),
        institute_academic_prefix: z.string().optional(),
        degree_academic: z.string().optional(),
        degree_casual: z.string().optional(),
        dates: z.string().optional(),
        dates_casual: z.string().optional(),
        extras_academic: z.array(z.string()).optional(),
        extras_casual: z.array(z.string()).optional(),
    }),
})

const projects = defineCollection({
    loader: () => loadYamlList("projects.yaml"),
    schema: z.object({
        include_in: includeIn.optional(),
        name: z.string().optional(),
        name_academic: z.string().optional(),
        name_casual: z.string().optional(),
        stack: z.string().optional(),
        stack_academic: z.string().optional(),
        stack_casual: z.string().optional(),
        description: z.string().optional(),
        description_academic: z.string().optional(),
        description_casual: z.string().optional(),
        url: z.string().optional(),
    }),
})

// Web-only: the Typst CVs derive their research section from experience.yaml
// (`category == "research"`), so nothing here reaches either PDF.
const research = defineCollection({
    loader: () => loadYamlList("research.yaml"),
    schema: z.object({
        include_in: includeIn.optional(),
        status: z.enum(["ongoing", "completed"]),
        title: z.string(),
        tags: z.string().optional(),
        description: z.string().optional(),
        dates: z.string().optional(),
        links: z.record(z.string(), z.string()).optional(),
    }),
})

const certifications = defineCollection({
    loader: () => loadYamlList("certifications.yaml"),
    schema: z.object({
        name: z.string(),
        name_casual: z.string().optional(),
        institute: z.string(),
        year: z.number(),
        include_in: includeIn.optional(),
        url: z.string().optional(),
        pdf_url: z.string().optional(),
    }),
})

const talks = defineCollection({
    loader: () => loadYamlList("talks.yaml"),
    schema: z.object({
        type: z.enum(["poster", "oral", "invited"]),
        title: z.string(),
        venue: z.string(),
        location: z.string().optional(),
        date: z.string(),
    }),
})

const openSource = defineCollection({
    loader: () => loadYamlList("open-source.yaml"),
    schema: z.object({
        name: z.string(),
        name_casual: z.string().optional(),
        name_url: z.string().optional(),
        include_in: includeIn.optional(),
        stack: z.string().optional(),
        stack_casual: z.string().optional(),
        description: z.string().optional(),
        description_casual: z.string().optional(),
        links: z.record(z.string(), z.string()).optional(),
    }),
})

const awards = defineCollection({
    loader: () => loadYamlSingle("awards.yaml"),
    schema: z.object({
        awards_notes_academic: z
            .array(
                z.object({
                    marker: z.string(),
                    text: z.string(),
                }),
            )
            .optional(),
        entries: z.array(
            z.object({
                year: z.number(),
                event: z.string(),
                event_casual: z.string().optional(),
                organizer: z.string().optional(),
                place_academic: z.string().optional(),
                place_casual: z.string().optional(),
                marker: z.string().optional(),
                include_in: includeIn.optional(),
                pdf_url: z.string().optional(),
            }),
        ),
    }),
})

const news = defineCollection({
    loader: () => loadYamlList("news.yaml"),
    schema: z.object({
        date: z.string(),
        content: z.string(),
    }),
})

const stringListSchema = z.object({ line: z.string() })

const workshops = defineCollection({
    loader: () => loadYamlStringList("workshops.yaml"),
    schema: stringListSchema,
})

const mentoring = defineCollection({
    loader: () => loadYamlStringList("mentoring.yaml"),
    schema: stringListSchema,
})

const volunteering = defineCollection({
    loader: () => loadYamlStringList("volunteering.yaml"),
    schema: stringListSchema,
})

export const collections = {
    personal,
    publications,
    experience,
    education,
    projects,
    research,
    certifications,
    talks,
    "open-source": openSource,
    awards,
    news,
    workshops,
    mentoring,
    volunteering,
}
