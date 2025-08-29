"use client";

import { Card, CardContent, Button, CardHeader } from "@mui/material";
import { Card as CardType } from "@/lib/types"; // Import the Card type
import Image from "next/image";
import Chip from "../../../public /darkChip.svg"
import Master from "../../../public /darkMaster.svg"
interface MyCardsProps {
  cards: CardType[]; // Accept cards as a prop
}

export function MyCards({ cards }: MyCardsProps) {
  return (
    <div className="space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Cards</h2>
        <Button color="primary" className="text-gray-600 hover:text-gray-900">
          See All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              style={{
                backgroundColor: card.isActive
                  ? "linear-gradient(to right, #5B5A6F, #000000)"
                  : "transparent", // Active card with gradient, inactive with no background
              }}
              className="relative overflow-hidden border-0 text-white h-48"
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-2xl font-semibold">${card.balance.toLocaleString()}</p>
                  </div>
                  <div className="">
                    <Image src={Chip} alt="chip" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">CARD HOLDER</p>
                      <p className="text-sm font-medium">{card.cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">VALID THRU</p>
                      <p className="text-sm font-medium">{card.validThru}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-mono tracking-wider">{card.cardNumber}</p>
                    <div className="">
                      <Image src={Master} alt="master" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No cards available.</div>
        )}
      </div>
    </div>
  );
}
