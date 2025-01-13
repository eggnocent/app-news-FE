export interface Content {
    ID: number;
    title: string;
    description: string;
    excerpt: string;
    image : string;
    tags: string[];
    status: string;
    created_at: string;
    author: string;
    created_by_name: string;
    created_by_id: number;
    category: number;
}

export interface ContentRequest {
    title: string;
    description: string;
    excerpt: string;
    image : string;
    tags: string[];
    status: string;
    created_by_id: number;
    category: number;
}