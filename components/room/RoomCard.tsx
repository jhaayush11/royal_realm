'use client'
import { Booking, Hotel, Room } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { AirVent, BedIcon, Castle, Home, Loader2, MountainSnow, PencilIcon,  Ship, Trash, Trees, Tv, UtensilsCrossed, VolumeX, Wifi } from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { toast } from "../ui/use-toast";

interface RoomCardProps{
  hotel?: Hotel & {
    rooms : Room[]
  }
  room: Room;
  bookings?: Booking[]
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);

  const pathName = usePathname();
  const isHotelDetailsPage = pathName.includes('hotel-details');
  const router = useRouter();

  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleRoomDelete = (room: Room) => {
    setIsLoading(true);
    const imageKey = room.image.substring(room.image.lastIndexOf('/' )+1);

    axios.post('/api/uploadthing/delete', { imageKey }).then(() => {
      axios
        .delete(`/api/room/${room.id}`)
        .then(() => {
          router.refresh();
          toast({
            variant: "success",
            description: "Room Deleted",
          });
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          toast({
            variant: "destructive",
            description: "Something went wrong!!",
          });
        });
    }).catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Something went wrong!!",
        });
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>

      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image fill src={room.image} alt={room.title} className="object-cover"/>
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem><BedIcon className="h-4 w-4" />{room.bedCount} Bed{'(s)'}</AmenityItem>
          <AmenityItem><BedIcon className="h-4 w-4" />{room.guestCount} Guests{'(s)'}</AmenityItem>
          <AmenityItem><BedIcon className="h-4 w-4" />{room.bathroomCount} Bathroom{'(s)'}</AmenityItem>
          {!!room.kingBed && <AmenityItem><BedIcon className="h-4 w-4" />{room.kingBed} King Bed{'(s)'}</AmenityItem>}
          {!!room.QueenBed && <AmenityItem><BedIcon className="h-4 w-4" />{room.QueenBed} Queen Bed{'(s)'}</AmenityItem>}
          {room.roomService && <AmenityItem><UtensilsCrossed className="h-4 w-4" />Room Services</AmenityItem>}
          {room.TV && <AmenityItem><Tv className="h-4 w-4" /> TV</AmenityItem>}
          {room.balcony && <AmenityItem><Home className="h-4 w-4" /> Balcony</AmenityItem>}
          {room.freeWifi && <AmenityItem><Wifi className="h-4 w-4" /> Free Wifi</AmenityItem>}
          {room.cityView && <AmenityItem><Castle className="h-4 w-4" /> City View</AmenityItem>}
          {room.mountainView && <AmenityItem><MountainSnow className="h-4 w-4" /> Mountain View</AmenityItem>}
          {room.oceanView && <AmenityItem><Ship className="h-4 w-4" /> Ocean View</AmenityItem>}
          {room.forestView && <AmenityItem><Trees className="h-4 w-4" /> Forest View</AmenityItem>}
          {room.airConditioned && <AmenityItem><AirVent className="h-4 w-4" /> Air Conditioned</AmenityItem>}
          {room.soundProofed && <AmenityItem><VolumeX className="h-4 w-4" /> Sound Proofed Room</AmenityItem>}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>Room Price: <span className="font-bold">₹{room.roomPrice}</span><span className="text-xs"> /24hrs</span></div>
          {!!room.breakFastPrice && <div>Breakfast Price: <span className="font-bold">${room.breakFastPrice}</span></div>}
        </div>
        <Separator/>
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ?
          <div>Hotel Details Page</div> :
          <div className="flex w-full justify-between">
          <Button disabled={isLoading} type='button' variant='ghost' onClick={()=>handleRoomDelete(room)}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4" />Deleting...</> : <><Trash className="mr-2 h-4 w-4" />Delete</>}</Button>
          <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger><Button type='button' variant='outline' className="max-w-[150px]"><PencilIcon className="mr-2 w-4 h-4"/>Update Room</Button></DialogTrigger>
                  <DialogContent className="max-w-[900px] w-[90%]">
                    <DialogHeader className="px-2"> 
                      <DialogTitle>Update a room</DialogTitle>
                      <DialogDescription>
                        Make changes in the details of this room.
                      </DialogDescription>
                    </DialogHeader>
                   <AddRoomForm hotel={hotel} room={room} handleDialogueOpen={handleDialogueOpen}  />
                  </DialogContent>
                </Dialog>
        </div>}
      </CardFooter>
      
    </Card>
  );
}

export default RoomCard;
