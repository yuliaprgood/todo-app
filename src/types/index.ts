export type Todo = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    active: boolean;
    tags: string[];
    userId: User['id'];
};

export type CreateTodoPayload = Omit<Todo, 'id'>;

export type User = {
    id: number;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    role?: UserRoles;
};

export type LoginUserPayload = Pick<User, 'email' | 'password'>;

export enum UserRoles {
    User = 'User',
    Admin = 'Admin',
}
