package com.example.wbdvsp2101sravanikumarserverjava.services;

import com.example.wbdvsp2101sravanikumarserverjava.models.Widget;
import com.example.wbdvsp2101sravanikumarserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    private List<Widget> widgets = new ArrayList<Widget>();

    {
        Widget w1 = new Widget(123l, "ABC123", "HEADING", "Welcome to Widgets", 2);
        Widget w2 = new Widget(234l, "ABC234", "PARAGRAPH", "This is a paragraph", 1);
        Widget w3 = new Widget(345l, "ABC234", "HEADING", "Welcome to WebDev", 3);
        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", "Lorem ipsum", 4);
        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

    // implement crud operations
    public Widget createWidgetForTopic(Widget widget) {
        Long id = (new Date()).getTime();
        widget.setId(id);
        widgets.add(widget);
        return widget;
    }

    public List<Widget> findAllWidgets() {
        return repository.findAllWidgets();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public Widget findWidgetById(Long id) {
        return repository.findWidgetById(id);
    }

    public Integer updateWidget(Long id, Widget newWidget) {
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                widgets.set(i, newWidget);
                return 1;
            }
        }
        return -1;
    }
    public Integer deleteWidget(Long id) {
        int index = -1;
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                index = i;
            }
        }
        if(index >= 0) {
            widgets.remove(index);
            return 1;
        }
        return -1;
    }

}
