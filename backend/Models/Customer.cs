using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesMonitor.API.Models;

[Table("appoint_head")]
public class Customer
{
    [Key]
    [Column("appoint_no")]
    public required string Id { get; set; }

    [NotMapped]
    public string Name { get => Id; set => Id = value; }

    [Column("contact_mail")]
    public string? Email { get; set; }

    [Column("contact_tel")]
    public string? Phone { get; set; }

    [Column("customer_name")]
    public string? Company { get; set; }

    [Column("total_amount")]
    public decimal? TotalSpend { get; set; }

    [NotMapped]
    public int TotalOrders { get; set; }

    [Column("is_status")]
    public string? Status { get; set; } // active, inactive

    [Column("record_date")]
    public DateTime? JoinDate { get; set; }

    [Column("visit_date")]
    public DateTime? LastOrder { get; set; }
}
