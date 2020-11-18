class EventsController < ApplicationController

  def index
    @events = Events.all
  end

  def new
    @event = Events.new
  end

  def show
    @event = Events.find(params[:id])
  end

  def create
    Events.create(event_parameter)
    redirect_to events_path
  end

  def destroy
    @event = Events.find(params[:id])
    @event.destroy
    redirect_to events_path, notice:"削除しました"
  end

  def edit
    @event = Events.find(params[:id])
  end

  def update
    @event = Events.find(params[:id])
    if @event.update(event_parameter)
      redirect_to events_path, notice: "編集しました"
    else
      render 'edit'
    end
  end

  private

  def event_parameter
    params.require(:event).permit(:title, :content, :start_time)
  end

end
