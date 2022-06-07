export type createAPIRequest = {
    type: "list" | "proposals"
    params: string
}

export type Dao = {
    name: string
    memberCount: number
    logo: string
}

export type Proposal = {
    title: string
    description: string
}

export type BadRequest = {
    message: string
}
