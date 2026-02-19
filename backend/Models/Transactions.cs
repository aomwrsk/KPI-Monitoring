using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesMonitor.API.Models;

[Table("cost_sheet_head")]
public class Quotation
{
    [Key]
    [Column("qt_no")]
    public required string Id { get; set; }

    [NotMapped]
    public string QuotationNo { get => Id; set => Id = value; }

    [Column("customer_name")]
    public string? CustomerName { get; set; }

    [Column("qt_date")]
    public DateTime? Date { get; set; }

    [Column("expiration_qt_date")]
    public DateTime? ExpiryDate { get; set; }

    [NotMapped]
    public List<QuotationItem> Items { get; set; } = new();
    
    [Column("so_amount")]
    public decimal? TotalAmount { get; set; }
    
    [Column("is_status")]
    public string? Status { get; set; }
    
    [Column("staff_name")]
    public string? CreatedBy { get; set; }
}

public class QuotationItem
{
    public required string Id { get; set; }
    public required string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal? UnitPrice { get; set; }
    public decimal? Total { get; set; }
}

[Table("order_head")]
public class Order
{
    [Key]
    [Column("order_no")]
    public string Id { get; set; } = "";

    [NotMapped]
    public string OrderNo { get => Id; set => Id = value; }

    [Column("customer_name")]
    public string? CustomerName { get; set; }

    [Column("order_date")]
    public DateTime? Date { get; set; }

    [Column("shipment_date")]
    public DateTime? shipment_date { get; set; }

    [NotMapped]
    public List<string> Items { get; set; } = new();

    [Column("total_before_vat")]
    public decimal? TotalAmount { get; set; }

    [Column("is_status")]
    public string? Status { get; set; }
    
    [NotMapped]
    public string? PaymentStatus { get; set; }
    
    [Column("remark")]
    public string? Notes { get; set; }
}
