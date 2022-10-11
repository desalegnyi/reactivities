using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Infrustructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>{
            
        }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext dataContext;
            public Handler(DataContext dataContext)
            {
            this.dataContext = dataContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await dataContext.Activities.ToListAsync();
            }
        }
    }
}