using AutoMapper;
using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Models;

namespace ChatApp.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, MemberDto>().
                ForMember(dest=>dest.PhotoUrl,options=>options.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain)!.Url)).
                ForMember(dest=>dest.Age,options=>options.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();

            CreateMap<UpdateMemberDto,AppUser>();
            CreateMap<RegisterDto,AppUser>();

            CreateMap<Message, MessageDto>().ForMember(dest=>dest.SenderPhotoUrl, 
                opt=>opt.MapFrom(s=>s.Sender.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl,
                opt => opt.MapFrom(s => s.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url)); ;
        }
    }
}
