export type BlogsType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export const db:{blogs: Array<BlogsType>, posts: Array<PostsType>} = {
    blogs: [
        {
            id: '1',
            name: 'Name',
            description: 'Description',
            websiteUrl: 'URL'
        }
    ],
    posts: [
        {
            id: '1',
            title: 'Title',
            shortDescription: 'Short Description',
            content: 'Content',
            blogId: '1',
            blogName: 'Name'
        }
    ]
}