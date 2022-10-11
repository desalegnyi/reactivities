using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Infrustructure;
using MediatR;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest{
            public Activity activity{ set; get;}
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext dataContext;
            public Handler(DataContext dataContext)
            {
            this.dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                dataContext.Activities.Add(request.activity);
                await dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}