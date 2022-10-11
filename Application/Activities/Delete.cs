using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrustructure;
using MediatR;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { set; get; }
        }
        public class Handler : IRequestHandler<Command>
        {
            public DataContext DataContext { get; }
            public Handler(DataContext dataContext)
            {
                this.DataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await DataContext.Activities.FindAsync(request.Id);
                DataContext.Activities.Remove(activity);
                await DataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}