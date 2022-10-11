using Domain;
using Infrustructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Details.Query{Id = id});
    }

    [HttpPost]
    public async Task<IActionResult> Create(Activity activity){
        return Ok(await Mediator.Send(new Create.Command{activity = activity}));
    }
    [HttpPut("{Id}")]
    public async Task<IActionResult> Edit(Guid Id, Activity activity){
        activity.Id = Id;
        return Ok(await Mediator.Send(new Edit.Command{activity = activity}));
    }
    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete(Guid Id){
        return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
    }
}
