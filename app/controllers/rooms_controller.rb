class RoomsController < ApplicationController

  def index
  end

  def new
  end

  def create
    Room.create(room_params)
    redirect_to root_path notice: '作成しました'
  end

  def destroy
    room = Room.find(params[:id])
    room.destroy
    redirect_to root_path
  end

  private

  def room_params
    params.require(:room).permit(:name, user_ids:[])
  end
end