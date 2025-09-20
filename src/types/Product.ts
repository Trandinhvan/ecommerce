export interface Product {
    id: string;            // backend trả Guid, nên dùng string
    name: string;
    description?: string;
    price: number;
    categoryId: string;    // backend trả Guid
    categoryName: string;  // mới thêm để hiển thị tên category
    imageUrl: string;
    createdAt: string;     // nếu cần hiển thị thời gian
    stock?: number;        // nếu backend trả thêm
}
