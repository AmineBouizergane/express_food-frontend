export interface Page<T>{
        size: number;
        page: number;
        totalPage: number;
        content: T[];  
}