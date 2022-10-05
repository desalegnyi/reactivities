using Domain;
using Infrustructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly DataContext dataContext;

    public ActivitiesController(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await dataContext.Activities.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await dataContext.Activities.FindAsync(id);
    }
}
