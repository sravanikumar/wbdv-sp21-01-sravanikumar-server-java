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

    // implement crud operations
    public Widget createWidgetForTopic(Widget widget) {
        return repository.save(widget);
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
        Widget originalWidget = findWidgetById(id);

        originalWidget.setText(newWidget.getText());
        originalWidget.setSize(newWidget.getSize());
        originalWidget.setType(newWidget.getType());
        originalWidget.setSrc(newWidget.getSrc());
        originalWidget.setHeight(newWidget.getHeight());
        originalWidget.setWidth(newWidget.getWidth());
        originalWidget.setOrdered(newWidget.getOrdered());

        repository.save(originalWidget);
        return 1;
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }

}
