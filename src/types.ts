export interface Brand {
    id: number;
    name: string;
    description: string | null;
}

export interface Brief {
    id: number;
    name: string;
    content: string;
    created_at: string;
    brand_id: number;
}

export interface Influencer {
    id: number;
    name: string;
}

export interface Submission {
    id: number;
    influencer_id: number;
    brief_id: number;
    text: string | null;
    created_at: string;
    status: string;
    brand_id: number;
    feedback: string | null;
}
