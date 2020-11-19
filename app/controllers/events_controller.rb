class EventsController < ApplicationController

  def index
    @events = Event.all
    @room = Room.find(params[:room_id])
  end

  def new
    @event = Event.new
  end

  def show
    @event = Event.find(params[:id])
  end

  def create
    @event = Event.new(params[:id])
    if @event.save(event_parameter)
      redirect_to room_events_path(@room)
    else
      render :index
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to events_path, notice:"削除しました"
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_parameter)
      redirect_to room_events_path, notice: "編集しました"
    else
      render 'edit'
    end
  end

  private

  def event_parameter
    params.permit(:title, :content, :start_time)
  end

end
