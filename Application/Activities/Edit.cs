using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Infrustructure;
using MediatR;

namespace Application.Activities
{
    public class Edit
    {
        public class Command: IRequest{
            public Activity activity {set; get;}
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext dataContext;
        public IMapper _mapper { get; }
            public Handler(DataContext dataContext, IMapper mapper)
            {
            this._mapper = mapper;
            this.dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dataContext.Activities.FindAsync(request.activity.Id);
                _mapper.Map(request.activity, activity);
               await dataContext.SaveChangesAsync();
               return Unit.Value;
            }
        }
    }
}