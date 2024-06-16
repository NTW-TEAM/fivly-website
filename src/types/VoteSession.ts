export type VoteSession = {
    id: number;
    question: string;
    description: string;
    beginDateTime: string;
    voteTimeInMinutes: number;
    type: string;
    anonymous: boolean;
    canceled: boolean;
};
