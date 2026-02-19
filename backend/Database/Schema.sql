-- =============================================
-- SQL Server Database Schema for SalesMonitor
-- =============================================

-- 1. Create Customers Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Customers')
BEGIN
    CREATE TABLE [Customers] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Phone] nvarchar(max) NOT NULL,
        [Company] nvarchar(max) NOT NULL,
        [TotalSpend] decimal(18,2) NOT NULL,
        [TotalOrders] int NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        [JoinDate] nvarchar(max) NOT NULL,
        [LastOrder] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
    );
END

-- 2. Create Quotations Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Quotations')
BEGIN
    CREATE TABLE [Quotations] (
        [Id] nvarchar(450) NOT NULL,
        [QuotationNo] nvarchar(max) NOT NULL,
        [CustomerName] nvarchar(max) NOT NULL,
        [Date] nvarchar(max) NOT NULL,
        [ExpiryDate] nvarchar(max) NOT NULL,
        [TotalAmount] decimal(18,2) NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        [CreatedBy] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Quotations] PRIMARY KEY ([Id])
    );
END

-- 3. Create Quotation Items Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QuotationItem')
BEGIN
    CREATE TABLE [QuotationItem] (
        [Id] nvarchar(450) NOT NULL,
        [QuotationId] nvarchar(450) NOT NULL,
        [ProductName] nvarchar(max) NOT NULL,
        [Quantity] int NOT NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [Total] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_QuotationItem] PRIMARY KEY ([QuotationId], [Id]),
        CONSTRAINT [FK_QuotationItem_Quotations_QuotationId] FOREIGN KEY ([QuotationId]) REFERENCES [Quotations] ([Id]) ON DELETE CASCADE
    );
END

-- 4. Create Orders Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Orders')
BEGIN
    CREATE TABLE [Orders] (
        [Id] nvarchar(450) NOT NULL,
        [OrderNo] nvarchar(max) NOT NULL,
        [CustomerName] nvarchar(max) NOT NULL,
        [Date] nvarchar(max) NOT NULL,
        [DeliveryDate] nvarchar(max) NOT NULL,
        [Items] nvarchar(max) NOT NULL,
        [TotalAmount] decimal(18,2) NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        [PaymentStatus] nvarchar(max) NOT NULL,
        [Notes] nvarchar(max) NULL,
        CONSTRAINT [PK_Orders] PRIMARY KEY ([Id])
    );
END
