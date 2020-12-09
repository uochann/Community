class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: [:edit, :show, :update, :destroy]
  def index
    @events = Event.all
  end

  def new
    @event = Event.new
  end

  def show
  end

  def create
    Event.create(event_params)
    redirect_to events_path notice: '作成しました'
  end

  def destroy
    @event.destroy
    redirect_to events_path, notice: '削除しました'
  end

  def edit
  end

  def update
    if @event.update(event_params)
      redirect_to events_path, notice: '編集しました'
    else
      render 'edit'
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :start_time, :content)
  end
end
