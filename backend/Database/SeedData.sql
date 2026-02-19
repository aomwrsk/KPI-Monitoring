-- =============================================
-- SQL Server Seed Data for SalesMonitor
-- =============================================

-- Seed Customers
IF NOT EXISTS (SELECT TOP 1 1 FROM [Customers])
BEGIN
    INSERT INTO [Customers] (Id, Name, Email, Phone, Company, TotalSpend, TotalOrders, Status, JoinDate, LastOrder)
    VALUES 
    ('1', 'Somchai Jaidee', 'somchai@example.com', '081-234-5678', 'Thai Tech Co., Ltd.', 245000, 15, 'active', '2024-03-15', '2026-02-10'),
    ('2', 'Pranee Sukjai', 'pranee@example.com', '089-876-5432', 'Bangkok Solutions', 189000, 12, 'active', '2024-05-22', '2026-02-08'),
    ('3', 'Wichai Rattana', 'wichai@example.com', '092-111-2233', 'Northern Industries', 312000, 22, 'active', '2023-11-10', '2026-01-28'),
    ('4', 'Suda Mingkwan', 'suda@example.com', '085-444-5566', 'Siam Digital', 98000, 6, 'inactive', '2024-08-05', '2025-11-15'),
    ('5', 'Kittipong Chai', 'kittipong@example.com', '063-777-8899', 'Eastern Trading', 456000, 28, 'active', '2023-06-18', '2026-02-14'),
    ('6', 'Naree Boonma', 'naree@example.com', '091-222-3344', 'South Connect', 167000, 10, 'active', '2024-01-20', '2026-02-05'),
    ('7', 'Arthit Srisuk', 'arthit@example.com', '087-555-6677', 'Central Corp', 523000, 35, 'active', '2023-02-14', '2026-02-12'),
    ('8', 'Wilai Thongdee', 'wilai@example.com', '064-888-9900', 'Metro Systems', 78000, 4, 'inactive', '2025-03-10', '2025-09-20'),
    ('9', 'Prasit Kaewkla', 'prasit@example.com', '082-333-4455', 'Smart Solutions', 287000, 18, 'active', '2024-04-08', '2026-02-11'),
    ('10', 'Duangjai Phrom', 'duangjai@example.com', '095-666-7788', 'Creative Hub', 134000, 8, 'active', '2024-09-25', '2026-01-30');
END

-- Seed Orders
IF NOT EXISTS (SELECT TOP 1 1 FROM [Orders])
BEGIN
    INSERT INTO [Orders] (Id, OrderNo, CustomerName, Date, DeliveryDate, Items, TotalAmount, Status, PaymentStatus, Notes)
    VALUES
    ('1', 'BK-2026-001', 'Kittipong Chai', '2026-02-16', '2026-02-25', 'Enterprise Suite C x5', 75000, 'confirmed', 'paid', 'Priority delivery'),
    ('2', 'BK-2026-002', 'Somchai Jaidee', '2026-02-15', '2026-02-28', 'Premium Widget A x50', 22500, 'processing', 'partial', ''),
    ('3', 'BK-2026-003', 'Arthit Srisuk', '2026-02-14', '2026-02-22', 'Pro Bundle E x20;Starter Pack F x10', 15500, 'completed', 'paid', 'Regular customer'),
    ('4', 'BK-2026-004', 'Naree Boonma', '2026-02-13', '2026-02-26', 'Basic Package D x200', 30000, 'pending', 'unpaid', 'Awaiting approval'),
    ('5', 'BK-2026-005', 'Chaiwat Pongsa', '2026-02-12', '2026-02-20', 'Premium Widget A x80', 36000, 'confirmed', 'paid', '');
END

-- Seed Quotations
IF NOT EXISTS (SELECT TOP 1 1 FROM [Quotations])
BEGIN
    INSERT INTO [Quotations] (Id, QuotationNo, CustomerName, Date, ExpiryDate, TotalAmount, Status, CreatedBy)
    VALUES
    ('1', 'QT-2026-001', 'Somchai Jaidee', '2026-02-15', '2026-03-15', 22500, 'sent', 'Admin'),
    ('2', 'QT-2026-002', 'Kittipong Chai', '2026-02-14', '2026-03-14', 75000, 'accepted', 'Admin'),
    ('3', 'QT-2026-003', 'Arthit Srisuk', '2026-02-12', '2026-03-12', 14000, 'draft', 'Sales Team'),
    ('4', 'QT-2026-004', 'Pranee Sukjai', '2026-02-10', '2026-03-10', 40000, 'sent', 'Admin'),
    ('5', 'QT-2026-005', 'Wichai Rattana', '2026-02-08', '2026-03-08', 30000, 'rejected', 'Sales Team');
END
